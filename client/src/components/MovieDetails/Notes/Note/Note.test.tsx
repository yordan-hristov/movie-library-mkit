import { fireEvent, render } from "@testing-library/react"
import Note from "./Note"

describe('Note Component', () => {
    const mockHandleDelete = jest.fn();

    beforeEach(() => {
        render(<Note
            index={0}
            text={'noteText'}
            noteId={'noteId'}
            handleDelete={mockHandleDelete}
        />);
    });

    it('Has span with text content equal to index + 1', () => {
        const element = document.querySelector('.note span');
        expect(element).toHaveTextContent('1');
    });

    it('Has p with text content equal to text', () => {
        const element = document.querySelector('.note p');
        expect(element).toHaveTextContent('noteText');
    });

    it('Calls handleDelete on X click', () => {
        const element = document.querySelector('.note div');
        fireEvent.click(element!);
        expect(mockHandleDelete).toHaveBeenCalledTimes(1);
    })
})