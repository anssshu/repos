def break_into_multiple_list(mylist,n):
	lf=[]#final list
	
	lst=[]
	while  len(mylist)>n:
		for i in range(n):
			lst.append(mylist.pop(0))

		lf.append(lst)
		lst=[]
		
	lf.append(mylist)
	return lf
	
def join_n_element_of_list(mylist,n=10):
	mylist=break_into_multiple_list(mylist,n)
	l=[]
	for i in mylist:
		l.append("\n".join(i))
	return l



#



import sys,os
f=open("GueDeMapushant.txt")
s=f.read()
f.close()
book=s.split("\n\n\n\n")

j=0
l=''
d=list()
for i in book:
		k=i.strip("\n").split('\n')[0]
		if k.upper()==k and  k[:7]!="VOLUME " :
			l+="\n"+k+":"+str(j)
			d.append(i)
			
	
		
			j+=1
#print d[215]
ll=dict()
l2=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,18,19,20,21,22,23,59,60,61,62,63,64,78,79,88,89,90,91,92,93,105,106,107,118,119,120,142,143,216]
for i in range(len(d)):
	if i not in l2:
		k=d[i].strip("\n").split('\n')[0]
		ll.update({k:d[i]})
print ll.keys()	
import shelve
f=shelve.open("gue.db",writeback=True)
f["stories"]=ll
f.close()
book.pop(0)
book.insert(0,l)
currentpage=0
print "\n################################################################################\npage no:"+str(currentpage)+book[currentpage]+"\n################################################################################"

while 1:
	print "Please Enter the page number:"
	x=str(raw_input ())
	
	try:
		if x=="n":
		   currentpage+=1
		else:
			currentpage=int(x)
			
		
		print "\n################################################################################\npage no:"+str(currentpage)+book[currentpage]+"\n################################################################################"

	except:
		print "Please type an integer value"
	


