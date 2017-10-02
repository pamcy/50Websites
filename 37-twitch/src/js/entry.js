import loadMore from './loadmore';
import dropDown from './dropdown';
import modal from './modal';

$(document).ready(() => {
    $('.dropdown__item').on('click', loadMore.changeLanguage);
});
