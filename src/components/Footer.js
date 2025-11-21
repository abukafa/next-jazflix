"use client";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 mt-8">
      <div className="max-w-7xl mx-auto px-6 pb-0 mb-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-0">
          <div className="md:col-span-2 space-y-6">
            <ul className="flex gap-4">
              <li>
                <h6 className="text-white text-semibold">Terms of Use</h6>
              </li>
            </ul>

            <p className="text-sm leading-relaxed">
              This web streaming platform is made by students of Jaz Academy as
              media of learning Advance Programming Language and Fullstack
              Development with MongoDB, ExpressJs, ReactJs, and NodeJs. For
              personal usage only, Happy watching!
            </p>
          </div>

          <div className="text-center md:text-center mt-4">
            <h6 className="text-white font-semibold mb-3">Follow Us:</h6>

            <ul className="flex justify-center md:justify-center gap-4 text-xl">
              <li>
                <a
                  href="https://facebook.com/jazacademy"
                  className="hover:text-white"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/jazacademy"
                  className="hover:text-white"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/jazacademy.id"
                  className="hover:text-white"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
