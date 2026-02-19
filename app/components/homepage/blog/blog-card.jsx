// @flow strict
"use client";
import { timeConverter } from '@/utils/time-converter';
import Image from 'next/image';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';

function BlogCard({ blog }) {
  // Helper to check if URL is valid to prevent crashes
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const blogUrl = isValidUrl(blog.url) ? blog.url : '#';

  return (
    <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group h-full flex flex-col">
      <div className="h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-lg relative">
        <Image
          src={blog?.cover_image || '/image/blur-23.svg'}
          height={1080}
          width={1920}
          alt=""
          className='h-full w-full group-hover:scale-110 transition-all duration-300 object-cover'
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300" />
      </div>
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-center text-[#16f2b3] text-sm mb-3">
          <p>{timeConverter(blog.published_at)}</p>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1">
              <BsHeartFill />
              <span>{blog.public_reactions_count}</span>
            </p>
            {blog.comments_count > 0 &&
              <p className="flex items-center gap-1">
                <FaCommentAlt />
                <span>{blog.comments_count}</span>
              </p>
            }
          </div>
        </div>
        <Link
          target='_blank'
          href={blogUrl}
          onClick={(e) => {
            if (blogUrl === '#') e.preventDefault();
          }}
        >
          <p className='my-2 lg:my-3 cursor-pointer text-lg text-white sm:text-xl font-medium hover:text-violet-500 line-clamp-2'>
            {blog.title}
          </p>
        </Link>
        <p className='text-sm text-[#16f2b3] mb-2'>
          {`${blog.reading_time_minutes} Min Read`}
        </p>
        <p className='text-sm lg:text-base text-[#d3d8e8] pb-3 lg:pb-6 line-clamp-3'>
          {blog.description}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;