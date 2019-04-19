#include <iostream>

using namespace std;

//create a user defined name space
namespace foo{
	void printAuthor(){
		cout<<"\nAuthor:Anshuman Mund";
		}
	void printVersion(){
		cout<<"the current version of the application is 1.0.0";
		}
	
	
	}



int main(){
	
	
	cout <<"cpp programming is fun\n"<<"I love cpp";
	foo::printAuthor();
	
	return 0;
	}
