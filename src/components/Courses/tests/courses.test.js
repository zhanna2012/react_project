import { render, screen, within, fireEvent} from '@testing-library/react';

import Courses from '../Courses';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {rootReducer} from '../../../store/index';
import {mockedAuthorsList, mockedCoursesList} from '../../../constants';
import {getAuthorsAction} from '../../../store/authors/actionCreators';
import {getCoursesAction} from '../../../store/courses/actionCreators'
import {getUserAction} from '../../../store/user/actionCreators';
import {MemoryRouter} from 'react-router-dom';


const mockedState = {
  user: {
    isAuth: true,
    name: 'Admin',
    email: 'admin@email.com',
    token: 'admin-token',
    role: 'admin'
  },
  courses: mockedCoursesList,
  authors: mockedAuthorsList,
 };

 function renderWithRedux(ui, empty = false, {reduxState} = mockedState) {
  const store = createStore(rootReducer, reduxState);
  store.dispatch(getAuthorsAction(mockedState.authors));
  store.dispatch(getCoursesAction(empty ? [] : mockedState.courses));
  store.dispatch(getUserAction(mockedState.user));
  return render(<Provider store={store}><MemoryRouter initialEntries={['/']}>{ui}</MemoryRouter></Provider>);
}
const curComponent = <Courses />;

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

describe('TEST COURSES', () => {
    test('Courses should display amount of CourseCard equal length of courses array', () => {
        renderWithRedux(curComponent);
        expect(screen.getAllByTestId('course-card')).toHaveLength(mockedState.courses.length);  
        });
    test('Courses should display Empty container if courses array length is 0', () => {
        renderWithRedux(curComponent, true);
        const { getByText } = within(screen.getByTestId('courses-box'))
        expect(getByText('No courses found')).toBeInTheDocument()        
      });
    test('CourseForm should be showed after a click on a button "Add new course"',  () => {
        renderWithRedux(curComponent);
        fireEvent.click(screen.getByTestId('add-btn'));
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/courses/add');
      });
    
})

