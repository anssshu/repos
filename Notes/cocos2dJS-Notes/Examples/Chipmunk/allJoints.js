	// Ratchet every 90 degrees
	space.addConstraint(new cp.RatchetJoint(body1, body2, 0, Math.PI/2));


	// Force one to sping 2x as fast as the other
	space.addConstraint(new cp.GearJoint(body1, body2, 0, 2));

	// Force one to sping 2x as fast as the other
	space.addConstraint(new cp.GearJoint(body1, body2, 0, 2));

	// Hold their rotation within 90 degrees of each other.
	space.addConstraint(new cp.RotaryLimitJoint(body1, body2, -Math.PI/2, Math.PI/2));

	space.addConstraint(new cp.DampedRotarySpring(body1, body2, 0, 3000, 60));
	
	space.addConstraint(new cp.DampedSpring(body1, body2, v(15,0), v(15,0), 20, 5, 0.3));

	space.addConstraint(new cp.GrooveJoint(body1, body2, v(30,30), v(30,-30), v(-30,0)));

	space.addConstraint(new cp.PivotJoint(body1, body2, v.add(boxOffset, v(80,60))));

	space.addConstraint(new cp.SlideJoint(body1, body2, v(15,0), v(15,0), 20, 40));

	space.addConstraint(new cp.PinJoint(body1, body2, v(15,0), v(15,0)));
