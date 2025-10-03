const CartWidget = ({ quantity = 0 }) => {
  return (
    <a
      href="#carrito"
      className="relative inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
      title="Ir al carrito"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="20" r="1" />
        <circle cx="16" cy="20" r="1" />
        <path d="M2 2h2l2.6 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L22 7H6" />
      </svg>
      <span className="text-sm font-medium">Carrito</span>

      {quantity > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-sky-600 text-white text-xs font-semibold grid place-items-center">
          {quantity}
        </span>
      )}
    </a>
  )
}

export default CartWidget