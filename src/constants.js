const buttonLogin = 'Login';

const buttonSignUp = 'Sign up';

const editBtn = 'Edit';

const deleteBtn = 'Delete';

const altForLogo = 'online-learning';

const cardBtn = 'Show course';

const updateCourse = 'Update course';

const minInHour = 60;

const inputPlaceholder = 'Enter course name..';

const btnSearch = 'Search';

const btnAddNew = 'Add new course';

const title = 'Title';

const enterAuthor = 'Enter author name..';

const authorName = 'Author name';

const addAuthor = 'Add author';

const enterDuration = 'Enter duration';

const duration = 'Duration';

const deleteAuthor = 'Delete author';

const createAuthor = 'Create author';

const createCourse = 'Create course';

const enterTitle = 'Enter title';

const exit = 'Exit';

const register = {
    name: 'Enter name',
    email: 'Enter email',
    password: 'Enter password'
};

const registerLabel = {
    name: 'Name',
    email: 'Email',
    password: 'Password'
};

const registration = 'Register';

const logout = 'Logout';

const login = 'Login';


const mockedCoursesList = [
    {
    id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
    title: 'JavaScript',
    description: `Lorem Ipsum is simply dummy text of the printing and
   typesetting industry. Lorem Ipsum
    has been the industry's standard dummy text ever since the
   1500s, when an unknown
    printer took a galley of type and scrambled it to make a type
   specimen book. It has survived
    not only five centuries, but also the leap into electronictypesetting, remaining essentially u
    nchanged.`,
    creationDate: '8/3/2021',
    duration: 160,
    authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d', 'f762978b-61eb-4096-812b-ebde22838167'],
    },
    {
    id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
    title: 'Angular',
    description: `Lorem Ipsum is simply dummy text of the printing and
   typesetting industry. Lorem Ipsum
    has been the industry's standard dummy text ever since the
   1500s, when an unknown
    printer took a galley of type and scrambled it to make a type
   specimen book.`,
    creationDate: '10/11/2020',
    duration: 210,
    authors: ['df32994e-b23d-497c-9e4d-84e4dc02882f', '095a1817-d45b-4ed7-9cf7-b2417bcbf748'],
    },
    ]
   const mockedAuthorsList = [
    {
    id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
    name: 'Vasiliy Dobkin'
    },
    {
    id: 'f762978b-61eb-4096-812b-ebde22838167',
    name: 'Nicolas Kim'
    },
    {
    id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
    name: 'Anna Sidorenko'
    },
    {
    id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
    name: 'Valentina Larina'
    },
   ]

export  {mockedAuthorsList, 
    mockedCoursesList, 
    buttonLogin, 
    buttonSignUp,
    altForLogo, 
    cardBtn, 
    minInHour, 
    inputPlaceholder,
    btnSearch,
    btnAddNew,
    title,
    enterAuthor,
    authorName,
    addAuthor,
    enterDuration,
    duration,
    deleteAuthor,
    createAuthor,
    createCourse,
    enterTitle,
    exit,
    register,
    registerLabel,
    registration,
    logout,
    login,
    editBtn,
    deleteBtn,
    updateCourse};


   