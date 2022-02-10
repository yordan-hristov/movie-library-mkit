import { fireEvent, render } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import userService from "../../services/userService"
import store from "../../store/store"
import SignUp from "./SignUp"

describe('SignUp Component', () => {
    it('Calls registerUser with valid input', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignUp />
                </BrowserRouter>
            </Provider>
        );
        const mockRegisterUser = jest.spyOn(userService, 'registerUser');

        const emailInput = document.querySelector('input[name=email]');
        const passwordInput = document.querySelector('input[name=password]');
        const repeatPasswordInput = document.querySelector('input[name=repeatPassword]');
        const submit = document.querySelector('input[type=submit]');

        fireEvent.input(emailInput!, {
            target: { value: 'test@email.com' }
        });
        fireEvent.input(passwordInput!, {
            target: { value: '123456' }
        });
        fireEvent.input(repeatPasswordInput!, {
            target: { value: '123456' }
        });

        fireEvent.click(submit!);

        expect(mockRegisterUser).toHaveBeenCalledWith('test@email.com', '123456');
    });

    it('Does not call loginUser with invalid input', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignUp />
                </BrowserRouter>
            </Provider>
        );
        const mockRegisterUser = jest.spyOn(userService, 'registerUser');

        const emailInput = document.querySelector('input[name=email]');
        const passwordInput = document.querySelector('input[name=password]');
        const repeatPasswordInput = document.querySelector('input[name=repeatPassword]');
        const submit = document.querySelector('input[type=submit]');

        fireEvent.input(emailInput!, {
            target: { value: '' }
        });
        fireEvent.input(passwordInput!, {
            target: { value: '' }
        });
        fireEvent.input(repeatPasswordInput!, {
            target: { value: '' }
        });

        fireEvent.click(submit!);

        expect(mockRegisterUser).toHaveBeenCalledTimes(0);
    });
})