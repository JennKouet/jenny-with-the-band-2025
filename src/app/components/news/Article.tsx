import React from 'react'
import Image from 'next/image';
import CustomButton from '../_shared/ui/CustomButton';

export interface ArticleProps {
    title: string;
    description?: string;
    imageUrl: string;
    link: string;
    isActive?: boolean;
}

const Article = ({title, imageUrl, link, isActive}: ArticleProps) => {
    return (
        <div className={`${isActive ? "bg-red-600" : "bg-black"} border-y border-red-600  mt-4 flex flex-col items-center rounded-t-xl px-4 py-6`}>
            {/* IMAGE */}
            <div>
                <Image
                    src={`/images/uploads/${imageUrl}`}
                    alt={title}
                    width={340}
                    height={140}
                    className="object-contain w-full h-[140px] md:h-[200px] lg:h-[300px] rounded-t-lg"
                />
            </div>

            {/* TITLE */}
            <p className='font-[roboto] font-bold uppercase py-4'>{title}</p>

           {/*  BUTTON READ MORE */}
            <CustomButton
                text="Read More"
                className="hover:bg-red-600 md:mx-2 my-1 w-[160px]"
                onClick={() => window.open(link, "_blank")}
            />
        </div>
    )
};

export default Article;