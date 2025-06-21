import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative flex justify-center">
          <Image
            src="https://media.tenor.com/WnRSHzvFA34AAAAi/pokemon-%E5%AF%B6%E5%8F%AF%E5%A4%A2.gif"
            alt="Pokeball"
            className='object-contain w-40 h-40'
            width={160}
            height={160}
          />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Loading...
          </h2>
          <p className="">
            Preparing your Pokémon
          </p>
        </div>

        {/* Puntos animados */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
