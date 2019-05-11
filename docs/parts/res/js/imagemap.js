/* DynamicImageMap - uses image mapster
*  Creates dynamic tooltip elements on an image map
*/
function DynamicImageMap (imageTag) {
    
    this.inArea = false;
    this.imageMap = $(imageTag);
    this.captions = this.imageMap.data("captions");

    var _this = this;

    this.$single_opts = { fillColor: "000000", fillOpacity: 0, stroke: true, strokeColor: this.imageMap.data("stroke-color"), strokeWidth: 2 };
    this.$all_opts = { fillColor: "ffffff", fillOpacity: 0.4, stroke: false };
    this.$initial_opts = { 
        mapKey: "data-name", isSelectable: false,   
        onMouseover: function (data) {
            _this.inArea = true;

            var popover = $("#" + _this.imageMap.data("tt-caption"));
            var caption = _this.captions[data.key];

            $("#" + _this.imageMap.data("tt-caption-header")).text(caption[0]);
            $("#" + _this.imageMap.data("tt-caption-text")).html(caption[1]);

            // x1,y1,x2,y2
            var shape = $("#"+data.key).attr("shape");
            var coords = $("#"+data.key).attr("coords").split(",");
            var offset = _this.imageMap.parent().position();
            var height = popover.height();

            var ptop = 0, pleft = 0; // Setting a default for shapes that aren't explicitly handled (AKA "poly")
            if (shape === "circle") {
                var centerX = parseInt(coords[0], 10);
                var centerY = parseInt(coords[1], 10);
                var radius = parseInt(coords[2], 10);
                var top = centerY + radius;
                var bottom = centerY - radius;
                var right = centerX + radius;

                ptop = top + (offset.top - height/2) + (bottom-top)/2;
                pleft = right + offset.left + 4;
            }
            else if (shape === "rect") {
                var left = parseInt(coords[0], 10);
                var top = parseInt(coords[1], 10);
                var right = parseInt(coords[2], 10);
                var bottom = parseInt(coords[3], 10);

                ptop = top + (offset.top - height/2) + (bottom-top)/2 + parseInt($(imageTag).css("marginTop"));
                pleft = right + offset.left + 4 + parseInt($(imageTag).css("marginLeft"));
            }

            popover.css({
                position: "absolute",
                top: ptop + "px",
                left: pleft + "px"
            }).show();
        },

        onMouseout: function (data) {
            _this.inArea = false;
            $("#" + _this.imageMap.data("tt-caption")).hide();
        }
    };

    var options = $.extend({}, this.$all_opts, this.$initial_opts, this.$single_opts);
    
    this.imageMap.mapster("unbind")
        .mapster(options)
        .bind("mouseover", function() {
            if (!_this.inArea) {
                _this.imageMap.mapster("set_options", _this.$all_opts)
                    .mapster("set", true, "all")
                    .mapster("set_options", _this.$single_opts);
            }
        })
        .bind("mouseout", function() {
            if (!_this.inArea) {
                _this.imageMap.mapster("set", false, "all");
            }
    });

    this.imageMap.mapster('resize', this.imageMap.closest('.image-map-wrapper').width());
};