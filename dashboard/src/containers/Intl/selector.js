import { createSelector } from 'reselect';


const selectIntl = state => state.language;


const selectLocale = () => createSelector(
    [ selectIntl ],
    (language) => {
        return { locale: language.get('locale') };
    }
);


export default selectLocale;