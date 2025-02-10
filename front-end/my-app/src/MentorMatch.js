import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading, Text, IconButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const mentorsData = [
  { id: 1, name: 'Alice Doe', university: 'UT Austin', major: 'Computer Science', age: 22, interests: ['AI', 'Web Development'], mentorshipNeeded: 'career guidance' },
  { id: 2, name: 'Bob Johnson', university: 'UT Austin', major: 'Business Analytics', age: 24, interests: ['AI', 'Web Development'], mentorshipNeeded: 'career guidance' },
  { id: 3, name: 'Charlie Hudson', university: 'Stanford', major: 'Computer Science', age: 21, interests: ['Machine Learning', 'Data Science'], mentorshipNeeded: 'career guidance' },
  { id: 4, name: 'Dana', university: 'UCLA', major: 'Mechanical Engineering', age: 23, interests: ['CAD', 'Product Design'], mentorshipNeeded: 'career guidance' },
  { id: 5, name: 'Eve', university: 'UC Berkeley', major: 'Mathematics', age: 25, interests: ['Statistics', 'Cryptography'], mentorshipNeeded: 'research guidance' },
  { id: 6, name: 'Alice', university: 'UT Austin', major: 'Neuroscience', age: 22, interests: ['Sustainability', 'Medicine'], mentorshipNeeded: 'college prep' },
  { id: 7, name: 'Charlie', university: 'UT Dallas', major: 'Biology', age: 18, interests: ['Research' , 'Sustainability', 'Medicine'], mentorshipNeeded: 'college prep' },
];

function MentorMatch() {
  const [formData, setFormData] = useState({ university: '', major: '', age: '', interests: '', mentorshipNeeded: '' });
  const [matches, setMatches] = useState([]);
  const [starredMentors, setStarredMentors] = useState({});

  useEffect(() => {
    // Retrieve form data from localStorage
    const storedData = localStorage.getItem('mentorMatchData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
      findMatches(parsedData); // Find matches based on the retrieved data
    }
  }, []);

  const findMatches = (data) => {
    const interestsArray = data.interests.split(',').map(interest => interest.trim());
    const matchedMentors = mentorsData.map(mentor => {
      let score = 0;
      if (mentor.university === data.university) score++;
      if (mentor.major === data.major) score++;
      if (Math.abs(mentor.age - parseInt(data.age)) <= 2) score++;
      score += mentor.interests.filter(interest => interestsArray.includes(interest)).length;
      if (mentor.mentorshipNeeded === data.mentorshipNeeded) score++;
      const similarityScore = Math.min(Math.floor((score / 5) * 100), 100); // Calculate similarity score as a percentage
      return { ...mentor, similarityScore };
    }).filter(mentor => mentor.similarityScore >= 50); // Only include mentors with a similarity score >= 60

    setMatches(matchedMentors);
  };

  const toggleStarred = (id) => {
    setStarredMentors(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <Box bg="rgb(66, 112, 135)" minHeight="100vh" p={8}>
      <Box textAlign="center" color="white" mb={8}>
        <Heading as="h2" size="xl" mb={4} marginTop="20">Mentors</Heading>
      </Box>

      <Box bg="white" p={8} borderRadius="md" maxW="1000px" mx="auto" boxShadow="lg">
        <Text fontSize="xl" mb={6}>Here are your <b>matches</b>:</Text>
        <Flex wrap="wrap" gap={8} justifyContent="center">
          {matches.length > 0 ? (
            matches.map((mentor) => (
              <Link to={`/chat`}>
                <Box p={6} border="1px solid #ccc" borderRadius="lg" bg="white" w="250px" boxShadow="md">
                  <Flex mb={4} alignItems="center" justifyContent="space-between">
                    <Box borderRadius="full" bg="gray.200" h="50px" w="50px"></Box>
                    <Box>
                      <Text fontWeight="bold">{mentor.name}</Text>
                    </Box>
                    <IconButton
                      icon={<StarIcon color={starredMentors[mentor.id] ? 'yellow.400' : 'gray.300'} />}
                      variant="ghost"
                      onClick={() => toggleStarred(mentor.id)}
                      aria-label="Star Mentor"
                    />
                  </Flex>
                  <Box mb={4}>
                    <Text><b>University:</b> {mentor.university}</Text>
                    <Text><b>Major:</b> {mentor.major}</Text>
                    <Text><b>Age:</b> {mentor.age}</Text>
                    <Text><b>Interests:</b> {mentor.interests.join(', ')}</Text>
                    <Text><b>Mentorship Needed:</b> {mentor.mentorshipNeeded}</Text>
                  </Box>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Box as="span" fontSize="lg" fontWeight="bold">Similarity Score:</Box>
                    <Box as="span" fontSize="lg" fontWeight="bold">{mentor.similarityScore}%</Box>
                  </Flex>
                </Box>
              </Link>
            ))
          ) : (
            <Text fontSize="lg">No matches found. Please adjust your search criteria.</Text>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default MentorMatch;
