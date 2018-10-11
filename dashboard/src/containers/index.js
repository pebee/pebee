import importedComponent from 'react-imported-component';


const Home = importedComponent(
    () => import(/* webpackChunkName:'Home' */ './Home')
);

const LoginPage = importedComponent(
    () => import(/* webpackChunkName:'LoginPage' */ './Login')
);

const ExtensionPage = importedComponent(
    () => import(/* webpackChunkName:'ExtensionPage' */ './ExtPage')
);

const Users = importedComponent(
    () => import(/* webpackChunkName:'Users' */ './Users')
);

const EditUser = importedComponent(
    () => import(/* webpackChunkName:'EditUser' */ './EditUser')
);


export {
    Home,
    Users,
    EditUser,
    LoginPage,
    ExtensionPage
};