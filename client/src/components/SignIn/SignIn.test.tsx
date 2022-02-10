import { fireEvent, render } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import userService from "../../services/userService"
import store from "../../store/store"
import SignIn from "./SignIn"

describe('SignIn Component', () => {
    it('Calls loginUser with valid input', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignIn />
                </BrowserRouter>
            </Provider>
        );
        const mockLoginUser = jest.spyOn(userService, 'loginUser');

        const emailInput = document.querySelector('input[name=email]');
        const passwordInput = document.querySelector('input[name=password]');
        const submit = document.querySelector('input[type=submit]');

        fireEvent.input(emailInput!, {
            target: {value: 'test@email.com'}
        });
        fireEvent.input(passwordInput!, {
            target: {value: '123456'}
        });

        fireEvent.click(submit!);
        
        expect(mockLoginUser).toHaveBeenCalledWith('test@email.com', '123456');
    });

    it('Does not call loginUser with invalid input', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignIn />
                </BrowserRouter>
            </Provider>
        );
        const mockLoginUser = jest.spyOn(userService, 'loginUser');

        const emailInput = document.querySelector('input[name=email]');
        const passwordInput = document.querySelector('input[name=password]');
        const submit = document.querySelector('input[type=submit]');

        fireEvent.input(emailInput!, {
            target: {value: ''}
        });
        fireEvent.input(passwordInput!, {
            target: {value: ''}
        });

        fireEvent.click(submit!);
        
        expect(mockLoginUser).toHaveBeenCalledTimes(0);
    });
})