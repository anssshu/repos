//------------------------start of function---------------------------
//create an importable function

void sing(){
	std::cout<<"sagar kinare dil ye pukare tum jo nahin to mera koi nahin hai";
	};

//-----------------------end of function-------------------------------
//----------------------------------------------------------------------

//-------------------------start of name space--------------------------
//create a user defined name space
namespace group{
	void printAuthor(){
		std::cout<<"\nAuthor:Anshuman Mund";
		}
	void printVersion(){
		std::cout<<"the current version of the application is 1.0.0";
		}
	
};
//-------------------------end of namespace----------------------------

//--------------------------------------------------------------------
//---------------------------start of Car class-----------------------
//car class implementation
class Car{
	public:
		void printName();
		int initNumber;
		Car();//this is the constructor
		Car(int Carnumber);//multiple constructor
		};//end of class implementation

//default values can be set inside it		
Car::Car(){
	std::cout<< "\nCar has been created";
	};
	
//multiple constructor with initialization
Car::Car(int Carnumber){
	initNumber=Carnumber;
	std::cout<< "\nCar has been created:"<<initNumber;
	};

void Car::printName(){
	std::cout << "\nthis is the car object";
	};
//end of the car
//--------------------------end of Car class----------------------------


//--------------------------Base Class----------------------------------
//class interface
class Point{
	public:
		double x,y;
		Point();
		Point(double x0,double y0);
		void printPos();
	};
//-----class implementation
//default constructor
Point::Point(){
	x=0;
	y=0;
	};
	
//constructor with initiliazation
Point::Point(double x0,double y0){
	x=x0;
	y=y0;
	};
void Point::printPos(){
	//xp=xp : x;
	//yp=yp : y;
	std::cout<<"\nthe position x and y are at:"<<x<<","<<y;
	};
//------------------------End of base class-----------------------------
//----------------------------------------------------------------------
//---------------------------Start of Subcals---------------------------
class Circle:public Point{
	public:
		   
		   double radius,x,y;
		   //constructor
		   Circle();
		   //initilizer constructor
		   Circle(Point cent,double radius);
	};
//ciccle implementationn with base class initialisation
Circle::Circle():Point(10,10){
	radius=5;
	x=10;
	y=10;
	
	};
//circle implementation with base class initialisation	
Circle::Circle(Point cent,double r):Point(cent.x,cent.y){
	x=cent.x;
	y=cent.y;
	radius=r;
	
	
	};
//----------------------------------------------------------------------



