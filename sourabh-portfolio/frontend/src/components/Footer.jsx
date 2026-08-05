export default function Footer() {
  return (
    <footer className="border-t border-crimson/10 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-paper/40">
        <p>© {new Date().getFullYear()} Sourabh S Nagarkar. Built with React, Express & MongoDB.</p>
        <p>Bengaluru, Karnataka</p>
      </div>
    </footer>
  );
}
