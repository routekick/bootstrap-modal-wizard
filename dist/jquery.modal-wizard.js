/*
 *  bootstrap-modal-wizard - v1.0.0
 *  Bootstrap plugin to create modal with multisteps like installing wizard
 *  https://github.com/routekick/bootstrap-modal-wizard
 *
 *  Made by Routekick
 *  Under MIT License
 */
(function ($) {
    $.fn.modalWizard = function () {
        return this
            .on('show.bs.modal', function () {
                // init the steps
                updateModalStep($(this));
            })
            .on('hide.bs.modal', function () {
                // some code for later
            })
            .on("navigate", function (e, navDir, stepNumber) {
                var $this = $(this);
                if (stepNumber) {
                    $this.attr("data-current-step", stepNumber);
                } else if (navDir === 'next') {
                    $this.attr("data-current-step", +$this.attr("data-current-step") + 1);
                } else {
                    $this.attr("data-current-step", +$this.attr("data-current-step") - 1);
                }
                updateModalStep($this);
            })
            .on('update', function () {
                // some code for later
            })
            .on('reset', function () {
                // to reset the modal
                // check if it's a form and reset it
                var $this = $(this),
                    $form = $this.find('form');
                $this.attr('data-current-step', $this.data('current-step')); // $.fn.data only store the inital value
                if (this.reset) {
                    this.reset();
                } else if ($form.length) {
                    $form.get(0).reset();
                } else {
                    $this.find('input').val('');
                }
            })
            .on('click', '[data-submit], [type=submit]', function (e) {
                var $modal = $(e.delegateTarget);
                checkValidate($modal);
            })
            .on('click', '[data-step-to]', function (e) {
                var $this = $(e.target);
                var $modal = $(e.delegateTarget);
                $modal.trigger('navigate', [$this.data("step-to")]);
            });
    }

    function updateModalStep($modal) {
        var step = +$modal.attr("data-current-step"),
            stepsLength = $modal.find('[data-step]').length;
        if (step === 1) {
            $modal.find('[data-step-to=prev]').hide().end().find('[data-step-to=next]').show().end().find('[data-submit], [type=submit]').hide();
        } else if (step === stepsLength) {
            $modal.find('[data-step-to=next]').hide().end().find('[data-submit], [type=submit]').show();
        } else if (step > stepsLength && step < 0) {
            return;
        } else {
            $modal.find('[data-step-to]').show().end().find('[data-submit], [type=submit]').hide();
        }
        $modal
            .find("[data-step=" + step + "]")
            .show()
            .siblings("[data-step]")
            .hide()
            .end()
            .trigger('update', [step]);
    }

    function checkValidate($modal) {
        var $step = $modal.find(':required:invalid').closest('[data-step]');
        if ($step.length) $modal.trigger('navigate', [null, $step.data('step')]);
    }

})(jQuery);
