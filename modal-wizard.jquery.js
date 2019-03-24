(function ($) {
    $.fn.multistep = function () {
        return this
            .on('show.bs.modal', function () {
                // init the steps
                updateModalStep($(this));
            })
            .on('hide.bs.modal', function () {
                // some code for later
            })
            .on("navigate", function (e, navDir) {
                var $this = $(this);
                if (navDir === 'next') {
                    $this.attr("data-current-step", +$this.attr("data-current-step") + 1);
                } else {
                    $this.attr("data-current-step", +$this.attr("data-current-step") - 1);
                }
                updateModalStep($this);
            })
            .on('update', function() {
                // some code for later
            })
            .on('reset', function () {
                // to reset the modal
                // check if it's a form and reset it
                var $this = $(this);
                $this.attr('data-current-step', $this.data('current-step')); // $.fn.data only store the inital value
                if (this.reset) {
                    this.reset();
                } else {
                    $this.find('input').val('');
                }
            })
            .on('click', '[data-step-to]', function (e) {
                var $this = $(e.target);
                var $modal = $(e.delegateTarget);
                $modal.trigger('navigate', [$this.data("step-to")]);
            })
            .on('click', '[data-submit]', function (e) {
                var $modal = $(e.delegateTarget);
                $modal.trigger('submit');
            });
    }

    function updateModalStep($modal) {
        var step = +$modal.attr("data-current-step"),
            stepsLength = $modal.find('[data-step]').length;
        if (step === 1) {
            $modal.find('[data-step-to=prev]').hide().end().find('[data-step-to=next]').show().end().find('[data-submit]').hide();
        } else if (step === stepsLength) {
            $modal.find('[data-step-to=next]').hide().end().find('[data-submit]').show();
        } else if (step > stepsLength && step < 0) {
            return;
        } else {
            $modal.find('[data-step-to]').show().end().find('[data-submit]').hide();
        }
        $modal
            .find("[data-step=" + step + "]")
            .show()
            .siblings("[data-step]")
            .hide()
            .end()
            .trigger('update', [step]);
    }
})(jQuery);
