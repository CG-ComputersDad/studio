export function Footer() {
  return (
    <footer className="bg-muted py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} NutriSnap. Your personal calorie companion.</p>
      </div>
    </footer>
  );
}
