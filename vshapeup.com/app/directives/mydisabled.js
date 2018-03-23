app.directive('myDisabled', function () {
    return {
        link: function (scope, elem, attr) {
            var color = elem.css('color'),
                textDecoration = elem.css('text-decoration'),
                cursor = elem.css('cursor'),
                // double negation for non-boolean attributes e.g. undefined
                currentValue = !!scope.$eval(attr.myDisabled),

                current = elem[0],
                next = elem[0].cloneNode(true);

            var nextElem = angular.element(next);

            nextElem.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });

            nextElem.css('color', 'gray');
            //nextElem.css('text-decoration', 'line-through');
            nextElem.css('cursor', 'not-allowed');
            nextElem.attr('tabindex', -1);

            scope.$watch(attr.myDisabled, function (value) {
                // double negation for non-boolean attributes e.g. undefined
                value = !!value;

                if (currentValue != value) {
                    currentValue = value;
                    current.parentNode.replaceChild(next, current);
                    var temp = current;
                    current = next;
                    next = temp;
                }

            })
        }
    }
});