import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-border rounded-full flex items-center justify-center">
          <Image src="https://www.gifcen.com/wp-content/uploads/2022/04/pokemon-gif-6.gif" alt="Pokeball"  className='object-cover rounded-full w-24 h-24' width={100} height={100} />
          </div>
          <div className="mb-4">
            <h1 className="text-6xl font-bold mb-2">
              404
            </h1>
            <h2 className="text-2xl font-bold mb-2">
              Page not found
            </h2>
          </div>
          <p className="mb-8">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-foreground text-background hover:bg-foreground/80 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Go to home
          </Link>
          <Link
            href="/catalog"
            className="block w-full bg-border hover:bg-border/80 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Explore catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
