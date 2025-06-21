'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CustomButton from '@/app/components/_shared/ui/CustomButton';

const ProductCardComponent = () => {

    const ProductsList = [
        {
            id: 1,
            title: "Vinyle 33 tours - Album 'Try to Kill Me'",
            imageUrl: "/images/vinyle-detour.png",
            link: "https://jenny-with-the-band.sumupstore.com/article/1-vinyle-33-tours-album-try-to-kill-me"
        },
        {
            id: 2,
            title: "CD - Album 'Try to Kill Me'",
            imageUrl: "/images/uploads/cd-jwb.webp",
            link: "https://jenny-with-the-band.sumupstore.com/article/2-try-to-kill-me-cd"
        },
        {
            id: 3,
            title: "T-shirt unisex",
            imageUrl: "/images/tshirt-det.png",
            link: "https://jenny-with-the-band.sumupstore.com/article/3-t-shirt-unisexe"
        },
        {
            id: 4,
            title: "Casquette",
            imageUrl: "/images/casquette.png",
            link: "https://jenny-with-the-band.sumupstore.com/article/4-casquette"
        }
    ]

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {ProductsList.map((product) => (
                <Link key={product.id} href={product.link} target="_blank" className="w-full  h-full">
                    <div key={product.id} className="w-full h-[300px]">
                        <Image
                            src={product.imageUrl}
                            alt="Jenny with the Band products image"
                            width={210}
                            height={260}
                            className="object-contain w-full h-full"
                        />
                    </div>
                    <div className="text-center text-white font-bold h-14">
                        <h3 className="text-lg">{product.title}</h3>
                    </div>
                    <CustomButton 
                        text="Buy now"
                        className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => window.open(product.link, '_blank')} 
                    />
                </Link>
            ))}
        </div>
    );
}

export default ProductCardComponent;