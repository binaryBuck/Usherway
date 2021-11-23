import { invalid } from "@angular/compiler/src/render3/view/util";

export const LOGIN = {
    email: {
        required: 'Email is required',
        email: 'Email is invalid'
    },
    password: {
        required: 'Password is required',
        minlength: 'Password must be at least 6 characters long'
    }
}

export const SIGNUP = {
    email: {
        required: 'Email is required',
        email: 'Email is invalid'
    },
    password: {
        required: 'Password is required',
        minlength: 'Password must be at least 6 characters long'
    }
}