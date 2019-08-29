let ajax_more_bttn = document.getElementsByClassName('ajax_more_bttn');
let catalog_sort_by_parametrs = document.querySelectorAll('.catalog_sort_by_parametrs a');

var bindCurFavBtn = function(favBtn, callback) {
    favBtn.addEventListener("click", function (event) {
        event.preventDefault();
        let link = event.target;
        let route = link.dataset.route;
        let cntDiv = document.querySelector('.header_favourite_count');
        let cnt = +cntDiv.innerHTML;
        if (link.classList.contains('active')) {
            link.classList.remove('active');
            route = route.replace('product_add', 'product_delete');
            cnt--;
        } else {
            link.classList.add('active');
            route = route.replace('product_delete', 'product_add');
            cnt++;
        }

        fetch(route, {
            method: 'POST',
            headers: {
                'X-Requested-With': "XMLHttpRequest"
            }
        })
            .then(function (response) {
                return response.text();
            })
            .then(function (response) {
                cntDiv.innerHTML = cnt;

                if (!!callback)
                    callback();
            });
    });
};

var bindFavButtons = function()
{
    let favourite_bttns = document.getElementsByClassName('favourite_bttn');
    let favBtnDetail = document.getElementsByClassName('add_to_fav');
    if (!!(favourite_bttns)) {
        for (let i = 0; i < favourite_bttns.length; i++) {
            if (!favourite_bttns[i].classList.contains('js-fav')) {
                bindCurFavBtn(favourite_bttns[i]);
                favourite_bttns[i].classList.add('js-fav');
            }
        }
    }
    if (!!favBtnDetail && !!favBtnDetail[0]) {
        let favBtnInDetail = favBtnDetail[0];
        bindCurFavBtn(favBtnInDetail, function() {
            if (favBtnInDetail.classList.contains('active')) {
                favBtnInDetail.innerHTML = 'Убрать из избранного';
            }
            else {
                favBtnInDetail.innerHTML = 'Добавить в избранное';
            }
        });
    }
};

bindFavButtons();

if (!!(catalog_sort_by_parametrs)) {
    for (let i = 0; i < catalog_sort_by_parametrs.length; i++) {
        catalog_sort_by_parametrs[i].addEventListener("click", function (event) {
            event.preventDefault();
            for (var i = 0; i < catalog_sort_by_parametrs.length; i++) {
                catalog_sort_by_parametrs[i].classList.remove("active");
            }
            let link = event.target;
            let path = link.parentNode.parentNode.dataset.path;
            let field = link.dataset.field;
            let sort = link.dataset.sort;
            let nodes = link.parentNode.parentNode.parentNode.parentNode.childNodes;
            var wrapper;
            for (let i = 0; i < nodes.length; i++) {
                //console.log(nodes[i].className);
                if (nodes[i].nodeName === 'DIV' && nodes[i].className !== 'catalog_sort_by') {
                    wrapper = nodes[i];
                    break;
                }
            }
            link.classList.add('active');
            //console.log(path, field, sort, wrapper);

            //if (0)
                let extra = 'sorting=' + field + '&by=' + sort;

                if (path.indexOf('?') !== -1) {
                    path += '&' + extra;
                }
                else {
                    path += '?' + extra;
                }
                fetch(path, {
                    method: 'GET',
                    headers: {
                        'X-Requested-With': "XMLHttpRequest"
                    }
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    let json = JSON.stringify(response);
                    wrapper.innerHTML = response.data;
                    bindBuyBtn();
                    bindFavButtons();
                });
            //}
        });
    }
}

if (!!(ajax_more_bttn) && ajax_more_bttn.length > 0) {
    ajax_more_bttn[0].addEventListener("click", function (event) {
        event.preventDefault();
        let btn = event.target;
        let page = +btn.dataset.current;
        let nextPage = page + 1;
        let pageCount = +btn.dataset.count;
        let path = btn.dataset.path;
        var wrapper = document.querySelector('' + btn.dataset.wrapper);
        //console.log(btn.dataset.wrapper, wrapper);
        var pagination = document.getElementsByClassName('page_pagination')[0];

        if (nextPage <= pageCount) {
            btn.dataset.current = nextPage;
            path += '?page=' + nextPage;

            fetch(path, {
                method: 'GET',
                headers: {
                    'X-Requested-With': "XMLHttpRequest"
                }
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                let json = JSON.stringify(response);
                //console.log(response.pagination);
                pagination.innerHTML = response.pagination;
                wrapper.insertAdjacentHTML('beforeend', response.data);
                bindBuyBtn();
                bindFavButtons();
            });
        }
        if (nextPage === pageCount) {
            btn.style.display = 'none';
        }
        //switchDisplay(search);
    });
}

let delete_from_cart_Arr = document.querySelectorAll('.delete_from_cart');

for (let i = 0; i < delete_from_cart_Arr.length; i++) {
    let btnDelete = delete_from_cart_Arr[i];
    btnDelete.addEventListener('click', function(event) {
        event.preventDefault();
        let id = this.dataset.id;
        fetch('/basket/delete/'+id, {
            method: 'POST',
            headers: {
                'X-Requested-With': "XMLHttpRequest"
            },
            body: ''
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.status === 'ok')
                    btnDelete.closest('tr').remove();
            });
    });
}

let call_back_popup_form = document.querySelector('form.call_back_popup');
let buy_in_one_click_form = document.querySelector('form.buy_in_one_click');
let report_lower_form = document.querySelector('form.report_lower_popup');
let order_3d_design_form = document.querySelector('form.order_3d_design_form');
let cart_checkout_form = document.querySelector('form.cart_checkout_form');

let sendPopupAjax = function(event, form, replyBlockId, sucessCallback) {
    event.preventDefault();
    let path = event.target.getAttribute('action');
    let formData = new FormData(form);
    fetch(path, {
        method: 'POST',
        headers: {
            'X-Requested-With': "XMLHttpRequest"
        },
        body: formData
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            if (response.status === 'ok') {
                form.innerHTML = response.result;
                if (!!sucessCallback)
                    sucessCallback();
            }
            else
                document.getElementById(replyBlockId).innerHTML = response.result;
        });
};

if (!!buy_in_one_click_form) {
    buy_in_one_click_form.addEventListener("submit", function (event) {
        sendPopupAjax(event, buy_in_one_click_form, 'err_res_call_back_popup');
    });
}

if (!!call_back_popup_form) {
    call_back_popup_form.addEventListener("submit", function (event) {
        sendPopupAjax(event, call_back_popup_form, 'err_res_oneclickbuy_popup');
    });
}

if (!!report_lower_form) {
    report_lower_form.addEventListener("submit", function (event) {
        sendPopupAjax(event, report_lower_form, 'err_res_report_lower_popup');
    });
}

if (!!order_3d_design_form) {
    order_3d_design_form.addEventListener("submit", function (event) {
        sendPopupAjax(event, order_3d_design_form, 'err_res_order_3d_design');
    });
}

if (!!cart_checkout_form) {
    cart_checkout_form.addEventListener("submit", function (event) {
        sendPopupAjax(event, cart_checkout_form, 'err_res_order', function(){
            document.querySelector('.products_in_cart').remove();
        });
    });
}