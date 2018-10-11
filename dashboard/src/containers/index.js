import importedComponent from 'react-imported-component';


const Home = importedComponent(
    () => import(/* webpackChunkName:'Home' */ './Home')
);

const LoginPage = importedComponent(
    () => import(/* webpackChunkName:'LoginPage' */ './Login')
);

const Extension = importedComponent(
    () => import(/* webpackChunkName:'Extension' */ './Extension')
);

const Users = importedComponent(
    () => import(/* webpackChunkName:'Users' */ './Users')
);

const EditUser = importedComponent(
    () => import(/* webpackChunkName:'EditUser' */ './EditUser')
);

const AccountCategoriesList = importedComponent(
    () => import(/* webpackChunkName:'AccountCategoriesList' */ './AccountCategoriesList')
);


export {
    Home,
    Users,
    EditUser,
    LoginPage,
    Extension,
    AccountCategoriesList
};