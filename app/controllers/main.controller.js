// Main controller

app.controller("mainController", function($scope, mainService) {

    // Get the inventory and menu
    $scope.inventory = mainService.getInventory();
    $scope.menu = mainService.getMenu();

    // Calculate costs for each product
    mainService.calcCost();

    // Restock inventory on click
    $scope.restock = () => {
        mainService.restock();
        $scope.output = "";
    };
    
    // Click handler for getting item to be purchased
    $scope.purchaseItem = index => {
        $scope.output = mainService.purchase(index);
    };

})
