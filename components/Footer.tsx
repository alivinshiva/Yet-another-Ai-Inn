import React from 'react'
import Image from 'next/image'
import avatarIMG from '../public/images/img-alivin.png'

function Footer() {
  return (
    <footer >
        <p className="text-base lg:text-xl md:text-xl text-gray-500 mt-4 mb-4 text-center">
          Made with  <strong className='text-red-500'> &hearts;</strong> by <strong>Alivin Shiva.</strong>
          <br />
          copyright &copy; Script Gen AI All rights reserved!
        </p>
        <div className=' flex justify-center items-center'>
          <Image
            src={avatarIMG}
            alt='Avatar'
            width={200}
            height={150}
          />
        </div>
        <div className="text-center"><h1 className="text-base lg:text-xl md:text-xl text-purple-700 mt-4 text-center "> Shivam Kumar</h1>
          <p className=" text-purple-500"><strong> ~Developer~</strong></p>

          <div className="flex space-x-4 mb-4 mt-4 justify-center ">
            <a href="https://github.com/alivinshiva">
              <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="rgb(126 34 206)" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
            <a href="https://x.com/alivinshiva/">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="7.025 7.025 497.951 497.95">
                <path fill="rgb(126 34 206)" d="M256 7.025C118.494 7.025 7.025 118.494 7.025 256S118.494 504.975 256 504.975 504.976 393.506 504.976 256C504.975 118.494 393.504 7.025 256 7.025zm-66.427 369.343h-54.665V199.761h54.665v176.607zM161.98 176.633c-17.853 0-32.326-14.591-32.326-32.587 0-17.998 14.475-32.588 32.326-32.588s32.324 14.59 32.324 32.588c.001 17.997-14.472 32.587-32.324 32.587zm232.45 199.735h-54.4v-92.704c0-25.426-9.658-39.619-29.763-39.619-21.881 0-33.312 14.782-33.312 39.619v92.704h-52.43V199.761h52.43v23.786s15.771-29.173 53.219-29.173c37.449 0 64.257 22.866 64.257 70.169l-.001 111.825z">

                </path>
              </svg>
            </a>
            <a href="https://telegram.me/alivinshiva">
              <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="rgb(126 34 206)" viewBox="0 0 16 16" >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z">
                </path>
              </svg>
            </a>
          </div>
        </div>

      </footer>
  )
}

export default Footer