function AnimatedBlobs() {
  return (
    <>
      {/* Purple Blob */}
      <div
        className="fixed top-10 left-10 w-72 h-72 bg-purple-500 rounded-full opacity-70 blur-3xl animate-blob mix-blend-multiply"
        style={{ willChange: 'transform' }}
      ></div>

      {/* Pink Blob */}
      <div
        className="fixed top-20 right-20 w-72 h-72 bg-pink-500 rounded-full opacity-70 blur-3xl animate-blob animation-delay-2000 mix-blend-multiply"
        style={{ willChange: 'transform' }}
      ></div>

      {/* Teal Blob */}
      <div
        className="fixed bottom-10 left-20 w-72 h-72 bg-teal-400 rounded-full opacity-60 blur-3xl animate-blob animation-delay-4000 mix-blend-multiply"
        style={{ willChange: 'transform' }}
      ></div>
    </>
  );
}

export default AnimatedBlobs;
