// components/Footer.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-12 ">
            <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 px-6">

                {/* Column 1 */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">EXCLUSIVE</h3>
                    <ul className="space-y-2 text-sm font-light">
                        <li><Link href="#" className="hover:text-white">Subscribe</Link></li>
                        <li><Link href="#" className="hover:text-white">Get 10% off your first order</Link></li>
                        <li>
                            <input
                                type="text"
                                placeholder="Enter Your Email"
                                className="border px-1 py-2 rounded flex-1 border-white text-gray-300"
                            />
                        </li>
                    </ul>
                </div>

                {/* Column 2 */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                    <ul className="space-y-2 text-sm font-light">
                        <li><Link href="#" className="hover:text-white">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</Link></li>
                        <li><Link href="#" className="hover:text-white">exclusive@gmail.com</Link></li>
                        <li><Link href="#" className="hover:text-white">+88015-88888-9999</Link></li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
                    <ul className="space-y-2 text-sm font-light">
                        <li><Link href="/profile" className="hover:text-white">My Account</Link></li>
                        <li><Link href="#" className="hover:text-white">Login / Register</Link></li>
                        <li><Link href="#" className="hover:text-white">Community</Link></li>
                        <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
                        <li><Link href="/wishlist" className="hover:text-white">Wishlist</Link></li>
                        <li><Link href="/products" className="hover:text-white">Shop</Link></li>
                    </ul>
                </div>

                {/* Column 4 */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Link</h3>
                    <ul className="space-y-2 text-sm font-light">
                        <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-white">Terms of use</Link></li>
                        <li><Link href="#" className="hover:text-white">FAQ</Link></li>
                        <li><Link href="#" className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>

                {/* Column 5 */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Social</h3>
                    <ul className="space-y-2 text-sm font-light">
                        <li><Link href="#" className="hover:text-white">Save $3 with App (New User Only)</Link></li>
                    </ul>
                    <div className="flex mt-2">
                        <Image src="/Qr Code.png"
                            alt="Qr Code" width={73} height={33}
                        />

                        <div className=" m-2 ">
                            <Image src="/GooglePlay.png"
                                alt="GooglePlay.png" width={83} height={100}
                            />
                            <Image src="/appStore.png"
                                alt="Qr Code" width={83} height={100}
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} My Company. All rights reserved.
            </div>
        </footer>
    );
}
