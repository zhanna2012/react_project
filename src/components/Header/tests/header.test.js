import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';
import {Provider} from 'react-redux';

describe('TEST HEADER', () => {
    const mockedState = {
        user: {
        isAuth: true,
        name: 'Test Name',
        },
        courses: [],
        authors: [],
       };

       const mockedStore = {
        getState: () => mockedState,
        subscribe: jest.fn(),
        dispatch: jest.fn(),
       };
       
    test('Logo should be in document', () => {
      render(<Provider store = {mockedStore}>
            <MemoryRouter initialEntries={['/']} >
              <Header />
          </MemoryRouter>
      </Provider>);
      expect(screen.getByTestId('logo')).toBeInTheDocument();  
    });
    test('Name of user should be in document', () => {
        render(<Provider store = {mockedStore}>
              <MemoryRouter initialEntries={['/courses']} >
                <Header />
            </MemoryRouter>
        </Provider>);
        expect(screen.getByTestId('user-name')).toBeInTheDocument();  
      });
})
  