(function() {

	window.onload=function() {
        $(".prettyprint").addClass("codeblock");
        collapsibleBlocksTools.init();
        prettyPrint();

        ideSelection.init();

        var title = $('#page-title')
        if (title.length) {
            title.html(document.title)
        }

        var header = $('header[role=course-title]')
        if (header.length) {
            header.html(document.title)
        }

        // Initialize our image maps
        if ($("img.image-map[usemap]").length) {
            // initialize each with local state.
            $.each($("img.image-map[usemap]"), function(index, value) {
                var map = new DynamicImageMap(value);
            });
            // Make them resize responsively
            $(window).resize( function() {
                $("img.image-map[usemap]").each(function() {
                    $(this).mapster('resize',$(this).closest('.image-map-wrapper').width());
                });
            });            
        }

        // Add figcaptions on all images which are missing it.
        $.each($("figure"), function(index,value) {
            var $value = $(value);
            if ($value.find("figcaption").length == 0) {
                var text = $value.find("img")[0].alt;
                if (text && text.toLowerCase() != "image") {
                    var $caption = $("<figcaption>");
                    $caption.text(text);
                    $value.append($caption);
                }
            }
        });

        // Get rid of collapsed anchors
        var cButtons = $("a.collapsed");
        if (cButtons.length) {
            $.each(cButtons, function(index, value) {
                var $value = $(value);
                var text = $value.text();
                $value.parent().text(text);
                $value.remove();
            });
        }
    }

    ////////////////////////////////////////
    // Setup the IDE selection, look for <ide> tags
    // and add our buttons to the UI when we find any.
    ////////////////////////////////////////
    var ideSelection = {
        init: function() {
            var hasIde = $("ide").length;
            if (hasIde > 0) {
                var $currentIDE = "vs";

                var $ideSelector = $("<div class=\"ide-selector\">");
                $ideSelector.append($("<a href=\"#\" data-name=\"vs\">Windows</a>"));
                $ideSelector.append($("<a href=\"#\" data-name=\"xs\">macOS</a>"));
                $ideSelector.insertBefore($("#main"));

                $ideSelector.bind('recalc', function(e, newValue) {
                    var value;
                    if (newValue == undefined) {
                        value = $currentIDE;
                    } else {
                        value = newValue;
                    }

                    $("div.ide-selector").find('a').removeClass('active');
                    $("div.ide-selector").find('a[data-name="' + value + '"]').addClass('active');

                    $('ide').hide();
                    $("ide[name='" + value + "']").show();
                });
            
                $ideSelector.trigger('recalc');
                $ideSelector.show();

                $ideSelector.on('click', 'a', function(e) {
                    e.preventDefault();
                    $ideSelector.trigger('recalc', $(this).attr('data-name'));
                });
            }
        }
    };

    ////////////////////////////////////////
    // Code to run the prettyprint-collapse tags
    ////////////////////////////////////////
    var collapsibleBlocksTools = {
        init: function(settings) {
            collapsibleBlocksTools.config = {
                expandedCodeBlocksClassName: "prettyprint",
                toggleCodeBlocksClassName: "prettyprint-collapse",
                toggleButtonClassName: "btn-toggle"
            };
            $.extend(collapsibleBlocksTools.config, settings);
            collapsibleBlocksTools.setupCodeBlocks();
            collapsibleBlocksTools.setupToggleButtons();
        },
        setupCodeBlocks: function() {
            // Wrap all prettyprint blocks in a cardblock.
            var blocks = $("." + collapsibleBlocksTools.config.expandedCodeBlocksClassName)
            $.each(blocks, function(index, node) {
                var wrapper = document.createElement("div");
                wrapper.className = "code-block card card-block";
                node.parentNode.insertBefore(wrapper, node);                
                wrapper.appendChild(node);
            });

            // Create a collapse button for any prettyprint-collapse blocks.
            var idCounter = 0;
            blocks = $("." + collapsibleBlocksTools.config.toggleCodeBlocksClassName);
            $.each(blocks, function(index, node) {
                var id = ("codeblock_" + idCounter++);
                var wrapper = document.createElement("p");

                var anchor = $("<a href=\"#\" onclick=\"toggleCode(this, '" + id + "'); return false;\" class=\"uiitem\">Show Code</a>")[0];
                wrapper.appendChild(anchor);
                node.parentNode.insertBefore(wrapper, node);

                var wsBlock = $("<div id=\"" + id + "\" style=\"display:none;\">")[0];
                wsBlock.appendChild(node);
                wrapper.appendChild(wsBlock);
                node.className = "prettyprint codeblock";
            });
        },
        setupToggleButtons: function() {
            // Rig up show/hide blocks
            var toggleButtons = $("." + collapsibleBlocksTools.config.toggleButtonClassName);
            $.each(toggleButtons, function(i, elem) {
                var $elem = $(elem);
                var showText = $elem.attr("data-toggle-show-text");
                var hideText = $elem.attr("data-toggle-hide-text");
                var $toggleBlock = $($elem.data("target"))


                if ($toggleBlock.length && showText && hideText) {
                    $toggleBlock.hide();
                    $elem.click(function() {
                        if($toggleBlock.css('display') == 'block') {
                            $toggleBlock.hide();
                            $elem.text(showText);
                        } else {
                            $toggleBlock.show();
                            $elem.text(hideText);
                        }
                    });
                }
            });
        }
    };


})();

// This is used to show/hide code blocks
function toggleCode(btn, id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block') {
      e.style.display = 'none';
      btn.innerHTML = "Show Code";
   }
   else {
      e.style.display = 'block';
      btn.innerHTML = "Hide Code";
   }
}
