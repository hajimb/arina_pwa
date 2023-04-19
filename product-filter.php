<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header bg-primary text-white">
                <h5 class="card-title mb-0 text-white">Search Filter</h5>
            </div>
            <div class="card-body">
                <form id="searchform" name="searchform">
                    <div class="row">
                        <!-- Choose Category -->
                        <div class="col-md-2 col-sm-12 col-xs-12 mb-1">
                            <label>Category</label>
                            <select id="category" class="form-control checkbtn selectpicker" data-live-search="true"
                                data-style="btn-outline-primary" title="Select Category">
                                <option value="0" selected>Select Category</option>
                            </select>
                        </div>
                        <div class="col-md-2 col-sm-12 col-xs-12 mb-1">
                            <label>Style No</label>
                            <input type="text" name="style_no" class="form-control checkbtn" id="style_no" placeholder="Style No" title="Style No" value="">
                        </div>
                        <div class="col-md-2 col-sm-12 col-xs-12 mb-1">
                            <label>Filter By </label>
                            <select id="filter" class="form-control checkbtn selectpicker"
                                data-style="btn-outline-primary" title="Select Category">
                                <option  value="0" selected>Select Filter By</option>
                    <?php if($pagename == 'products'){ ?>
                        <option  value="total_order">Total Order</option>
                        <option  value="open_order">Open Order</option>
                    <?php } ?>
                                <option hideid="1" dataid="1" value="gold_9kt">Gold Weight (9 kt)</option>
                                <option hideid="1" dataid="2" value="gold_10kt">Gold Weight (10 kt)</option>
                                <option hideid="1" dataid="3" value="gold_14kt">Gold Weight (14 kt)</option>
                                <option hideid="1" dataid="4" value="gold_18kt">Gold Weight (18 kt)</option>
                                <option hideid="1" dataid="5" value="gold_925s">Gold Weight (925 S)</option>
                                <option  value="diamond_weight">Diamond Weight</option>
                            </select>
                        </div>
                        <div class="col-md-2 col-sm-12 col-xs-12 mb-1">
                            <label>Min Value</label>
                            <input type="number" min="0" name="min_value" class="form-control checkbtn" id="min_value"
                                placeholder="Min Value" title="Min Value" value="0">
                        </div>
                        <div class="col-md-2 col-sm-12 col-xs-12 mb-1">
                            <label>Max Value</label>
                            <input type="number" min="0" name="max_value" class="form-control checkbtn" id="max_value"
                                placeholder="Max Value" title="Max Value" value="0">
                        </div>
                        <div class="col-md-2 col-sm-12 col-xs-12 mt-2 mb-1">
                            <button type="button" disabled=true id="search_btn"
                                class="btn btn-warning mt-2 search_btn waves-effect waves-light">Search </button>
                            <button type="button" id="clear_btn" class="btn btn-danger mt-2 waves-effect waves-light">
                                Clear </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>