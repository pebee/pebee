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

const SingleUser = importedComponent(
    () => import(/* webpackChunkName:'SingleUser' */ './SingleUser')
);

const AccountCategoriesList = importedComponent(
    () => import(/* webpackChunkName:'AccountCategoriesList' */ './AccountCategoriesList')
);

const SingleAccountCategory = importedComponent(
    () => import(/* webpackChunkName:'SingleAccountCategory' */ './SingleAccountCategory')
);


export {
    Home,

    Users,
    SingleUser,

    LoginPage,

    Extension,
    
    AccountCategoriesList,
    SingleAccountCategory
};