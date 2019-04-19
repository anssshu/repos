#include <iostream>
#include "foo.h"


//the main function
int main(){
	//function import from foo.h
	sing();
	
	//name space import from foo.h
	group::printAuthor();
	
	//class import from foo.h
	Car maruti;
	maruti.printName();
	
	//foo::Car::printName();
	
	//multiple inheritance import
	Point p0(100.67,100.56);
	p0.printPos();
	Circle c1(p0,100);
	c1.printPos();
	return 0;
}


