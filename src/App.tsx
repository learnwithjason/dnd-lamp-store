import { useQuery, useConvexAuth } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { api } from '../convex/_generated/api';
import { Lamp } from './components/lamp';
import { Toast } from './components/toast';
import './App.css';

function App() {
  const { isAuthenticated } = useConvexAuth();
  const lamps = useQuery(api.lamps.get);

  return (
    <>
      <header>
        <span>
          <a href="/">Bingus Bwamp’s Emporium of Enchanted Stones</a>
        </span>

        {isAuthenticated ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal" />
        )}
      </header>

      <main>
        <section>
          <h1>Light for every adventurer</h1>

          <p>
            These stones are all imbued with continual light, and you old pal
            Bingus always goes the extra mile: each has a lil something special
            to give you and your party a pick-me-up to suit any quest.
          </p>

          <Toast />
        </section>

        <ul className="lamp-list">
          {lamps?.map((lamp) => (
            <Lamp key={lamp._id} lamp={lamp} />
          ))}
        </ul>
      </main>

      <footer>
        <a href="https://lwj.dev/4d1a">
          part of 4 web devs build the same app idea
        </a>{' '}
        <a href="https://lwj.dev">a Learn With Jason project</a>{' '}
        <a href="https://github.com/learnwithjason/dnd-lamp-store">
          source code
        </a>
      </footer>
    </>
  );
}

export default App;
