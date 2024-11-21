import React from 'react';

function Register() {
    return(
        <div class="bg-cover bg-no-repeat bg-center bg-black w-screen h-screen flex justify-center items-center">
            <div class="relative bg-[black] w-1/2 h-4/5 aspect-w-16 aspect-h-9 rounded-[100px] opacity-80 shadow">
                <h1 class="text-center object-top mt-[20px] text-[white] font-roboto text-4xl">
                    Hello!
                </h1>
            </div>
        </div>
    )
}

function Login() {
    return(
        <div class="bg-black w-screen h-screen flex justify-center items-center">
            <h1>Hello ini login!</h1>
        </div>
    )
}

export {Register, Login};