import loadMore from './loadmore';
import dropDown from './dropdown';
import modal from './modal';
import scroll from './scroll';

$(document).ready(() => {
    $('.dropdown__item').on('click', loadMore.changeLanguage);
});
