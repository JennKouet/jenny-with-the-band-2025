import React from 'react'
import Image from 'next/image';
import CustomButton from '../_shared/ui/CustomButton';

export interface ArticleProps {
    title: string;
    description?: string;
    imageUrl: string;
    link: string;
}

const Article = ({title, imageUrl, link}: ArticleProps) => {
    return (
        <div>
            {/* IMAGE */}
            <div>
                <Image
                    src={imageUrl}
                    alt="Jenny with the Band logo"
                    width={340}
                    height={140}
                    className="object-cover"
                />
            </div>

            {/* TITLE */}
            <h3>{title}</h3>

           {/*  BUTTON READ MORE */}
            <CustomButton
                text="Read More"
                className="hover:bg-red-600 md:mx-2 my-1 w-[300px]"
                onClick={() => window.open(link, "_blank")}
            />
        </div>
    )
};

export default Article;