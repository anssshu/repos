//program to calculate the area of a circle
//include the header files
#include <iostream>
//decalre a constant to hold the value of PI
//#define PI 3.141;
const float PI = 3.141;

//declare a global variable  to hold the dia of the circle
float dia =200.3;

//declare a function to calculate the value of  the area
float area(float dia);


//write the main function
int main(){
	//take the input for dia of the circle
	std::cout<<"Please enter the value of the diameter of the circle in meter : ";	
	std::cin >> dia;

	std::cout<<"The area of the circle is:"<< area(dia)<<" square meter";

	return 0;

}

//define the function to calculate the area
float area(float dia){
	return dia*dia*PI/4;
}
