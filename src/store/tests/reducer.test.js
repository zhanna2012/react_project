import {coursesReducer} from "../courses/reducer";
import {getCoursesAction, addCourseAction} from '../courses/actionCreators'
import {mockedCoursesList} from '../../constants';


describe('test reducer', () => {
    test('reducer should return the initial state', () => {
        expect(coursesReducer(undefined, {})).toEqual({
            courses: []
        })
    });
    test('reducer should handle SAVE_COURSE and returns new state', () => {
        expect(coursesReducer(undefined, addCourseAction(mockedCoursesList[0]))).toEqual({
            courses: [mockedCoursesList[0]]
        });
    });
    test('reducer should handle GET_COURSES and returns new state', () => {
        expect(coursesReducer(undefined, getCoursesAction(mockedCoursesList))).toEqual({
            courses: [...mockedCoursesList]
        })
    });
})