const ItemListContainer = ({ greeting }) => {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          {greeting}
        </h1>
        <p className="text-slate-600">
          Pronto verás aquí el catálogo de productos. Esta caja es nuestro
          <span className="font-semibold"> ItemListContainer</span>.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map(card => (
            <div key={card} className="rounded-xl border border-slate-200 p-4 bg-slate-50">
              <div className="aspect-video rounded-lg bg-white border border-slate-200 grid place-items-center text-slate-400">
                Imagen
              </div>
              <h3 className="mt-3 font-semibold">Producto #{card}</h3>
              <p className="text-sm text-slate-600">Descripción breve del producto.</p>
              <button className="mt-3 inline-flex items-center justify-center px-3 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700">
                Ver más
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ItemListContainer