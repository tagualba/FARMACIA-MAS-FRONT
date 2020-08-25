function getCatalog()
{
    var res = selectApi("*");

    buildFilters(res.categorys ,res.marcas);
}

function buildFilters(categorys, marcas)
{
    var categoryHtmlBase =
        `<div id="Categoria@IDCATEGORIA">                                                  
            <div class="card border-0">
                <!--CATEGORIA HEADER-->  
                <div class="card-header bg-white border-0 p-1" id="HeaderCategoria@IDCATEGORIA">
                    <div class="mb-0">    
                        <div class="form-check">
                            <div class="custom-control form-control-lg custom-checkbox">  
                                <input type="checkbox" value="@IDCATEGORIA" class="custom-control-input checkBoton" id="CheckBoxCategoria@IDCATEGORIA"><!--ID-->
                                <label class="custom-control-label" for="CheckBoxCategoria@IDCATEGORIA"><!--Hace regerencia al id del check-->
                                    <h7>@CATEGORIANOMBRE</h7>  
                                </label> 
                                <label class="custom-control-label"
                                    data-toggle="collapse" data-target="#Subcategoria@IDCATEGORIA
                                    aria-expanded="true" aria-controls="Subcategoria@IDCATEGORIA"> <!--Apunta al SubCategoriaContenedor para manejar el escondido de eso-->                                              
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill flechita" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                        </svg> 
                                </label> 
                            </div>                                                                                                                             
                        </div>                                                     
                    </div>
                </div>
                <!--CATEGORIA HEADER-->  

                <div id="Subcategoria@IDCATEGORIA" class="collapse" aria-labelledby="HeaderCategoria@IDCATEGORIA"
                    data-parent="#Categoria@IDCATEGORIA"><!--SubcategoriaContenedor-->
                        <div class="card-body p-1 ml-2">
                            @SUBCATEGORIASCONTAINER
                        </div>
                </div>
            </div>
        </div>`;
    
    var resCategorys="";
    for (let category of categorys)
    {
        var resSubCategorys="";
        var subCategoryHtmlBase = 
        `<div class="form-check">
            <div class="custom-control form-control-lg custom-checkbox">  
                <input type="checkbox"  value="@IDSUBCATEGORIA"class="custom-control-input checkBoton" id="SubCategoriaCheckBox@IDSUBCATEGORIA">  
                <label class="custom-control-label" for="SubCategoriaCheckBox@IDSUBCATEGORIA">
                    <h7>@SUBCATEGORIANOMBRE</h7>  
                </label>  
            </div>  
        </div>`;

        for(let subCategory of category.subCategorys)
        {
            var aux = subCategoryHtmlBase.replace("@IDSUBCATEGORIA", subCategory.id);
            aux = subCategoryHtmlBase.replace("@SUBCATEGORIANOMBRE", subCategory.name);
            resCategorys+= subCategoryHtmlBase;
        }

        resCategorys += categoryHtmlBase.replace("@SUBCATEGORIASCONTAINER", resCategorys);
    }



    return resCategorys;
}