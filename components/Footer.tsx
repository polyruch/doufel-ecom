import React from "react";

function Footer() {
  return (
    <footer className="bg-zinc-200 text-pink-800 py-4 mt-2 ">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Dfl-collection Boutique. All rights reserved.</p>
        <p>Follow us on social media!</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-pink-600 hover:underline">
            Facebook
          </a>
          <a href="#" className="text-pink-600 hover:underline">
            Instagram
          </a>
          <a href="#" className="text-pink-600 hover:underline">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
