import loadMore from './loadmore';
import dropDown from './dropdown';

$(document).ready(() => {
    $('.dropdown__item').on('click', loadMore.changeLanguage);
});
