import React from 'react'


export default function Loading() {
  const loaders = Array.from({ length: 8 });

  return (
    <section className='py-10 h-screen flex justify-center items-center'>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15">
          {loaders.map((_, i) => (
            <span key={i} className="loader"></span>
          ))}
        </div>
      </div>
    </section>
  );
}
