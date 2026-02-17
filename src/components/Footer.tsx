export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-400 py-10 text-center mt-12 border-t border-gray-800">
      <p>&copy; {new Date().getFullYear()} Chilean Recipe Book. Made with ❤️.</p>
    </footer>
  );
}