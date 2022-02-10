import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import userService from '../../../services/userService';
import store from '../../../store/store';
import Notes from './Notes';

const mockNote = jest.fn();
jest.mock("./Note/Note", () => (props: any) => {
    mockNote(props);
    return <></>;
});

describe('Notes Component', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Notes
                    notes={[
                        { movieId: 'movieId1', note: 'note1', _id: 'noteId1' },
                        { movieId: 'movieId2', note: 'note2', _id: 'noteId2' },
                        { movieId: 'movieId3', note: 'note3', _id: 'noteId3' },
                    ]}
                    movieId={'movieId'}
                    userId={'userId'}
                />
            </Provider>
        );
    });

    it('Call createNote on Add click if input.value.length > 0', () => {
        const mockCreateNote = jest.spyOn(userService, 'createNote');
        const input = document.querySelector('.add-notes-input');
        const button = document.querySelector('.add-notes-button');
        fireEvent.input(input!, {
            target: {value: 'testInput'}
        });
        fireEvent.click(button!);

        expect(mockCreateNote).toHaveBeenCalledWith('userId','movieId','testInput');
    });

    it('Does not call createNote on Add click if input.value.length === 0', () => {
        const mockCreateNote = jest.spyOn(userService, 'createNote');
        const input = document.querySelector('.add-notes-input');
        const button = document.querySelector('.add-notes-button');
        fireEvent.input(input!, {
            target: {value: ''}
        });
        fireEvent.click(button!);

        expect(mockCreateNote).toHaveBeenCalledTimes(0);
    });

    it('Renders Note with props if notes > 0', () => {
        expect(mockNote).toHaveBeenCalledTimes(3);
    });

    it('Shows "No notes yet.." if notes === 0', () => {
        render(
            <Provider store={store}>
                <Notes
                    notes={[]}
                    movieId={'movieId'}
                    userId={'userId'}
                />
            </Provider>
        );

        const element = document.querySelector('.notes p');
        expect(element).toHaveTextContent('No notes yet...');
    });
})