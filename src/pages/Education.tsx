
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, BookOpen, Shield, CheckCircle, X } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Education = () => {
  const [showPhishingAlert, setShowPhishingAlert] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [showQuizResults, setShowQuizResults] = useState(false);

  const scamSigns = [
    {
      title: 'Unrealistic Returns',
      description: 'Promises of guaranteed high returns (>100% APY) with no risk',
      severity: 'high'
    },
    {
      title: 'Anonymous Team',
      description: 'No team information, fake profiles, or copied team photos',
      severity: 'high'
    },
    {
      title: 'No Liquidity Lock',
      description: 'Developers can remove liquidity at any time (rug pull risk)',
      severity: 'high'
    },
    {
      title: 'Honeypot Contract',
      description: 'You can buy tokens but cannot sell them',
      severity: 'medium'
    },
    {
      title: 'No Audit Report',
      description: 'Smart contract has not been audited by reputable firms',
      severity: 'medium'
    },
    {
      title: 'Heavy Marketing Focus',
      description: 'More focus on hype and marketing than actual product development',
      severity: 'low'
    }
  ];

  const securityTips = [
    'Never share your private keys or seed phrase with anyone',
    'Always verify contract addresses on official websites',
    'Use hardware wallets for large amounts',
    'Enable 2FA on all crypto exchanges',
    'Be cautious of airdrops and free token offers',
    'Double-check website URLs for typos (phishing)',
    'Research projects thoroughly before investing',
    'Start with small amounts when trying new protocols'
  ];

  const quizQuestions = [
    {
      question: 'What is the biggest red flag when evaluating a DeFi project?',
      options: [
        'High gas fees',
        'Anonymous team with no audit',
        'New project (less than 1 month)',
        'Complex tokenomics'
      ],
      correct: 1
    },
    {
      question: 'You receive an email asking you to "verify your wallet" by entering your seed phrase. What should you do?',
      options: [
        'Enter your seed phrase to verify',
        'Click the link to check if it\'s legitimate',
        'Delete the email immediately - it\'s a phishing attempt',
        'Forward it to friends for their opinion'
      ],
      correct: 2
    },
    {
      question: 'Before interacting with a new smart contract, you should:',
      options: [
        'Check if it\'s been audited',
        'Read the documentation',
        'Start with a small test amount',
        'All of the above'
      ],
      correct: 3
    }
  ];

  const simulatePhishing = () => {
    setShowPhishingAlert(true);
    setTimeout(() => setShowPhishingAlert(false), 5000);
  };

  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuiz] = answerIndex;
    setQuizAnswers(newAnswers);

    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
    } else {
      setShowQuizResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correct) {
        correct++;
      }
    });
    return correct;
  };

  const restartQuiz = () => {
    setCurrentQuiz(0);
    setQuizAnswers([]);
    setShowQuizResults(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      
      {/* Phishing Alert Popup */}
      {showPhishingAlert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Alert className="max-w-md bg-red-900 border-red-600">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-100">
              <strong>⚠️ PHISHING ALERT!</strong><br />
              This is a simulated phishing attempt. In real life, NEVER click suspicious links or enter your private keys on unknown websites. Always verify URLs and use official sources.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Web3 Security Education</h1>
          <p className="text-gray-400">Learn to protect yourself in the decentralized world</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Scam Token Signs */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                Red Flags: Scam Token Signs
              </CardTitle>
              <CardDescription className="text-gray-400">
                Learn to identify potentially fraudulent projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scamSigns.map((sign, index) => (
                  <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{sign.title}</h4>
                      <Badge variant={getSeverityColor(sign.severity)}>
                        {sign.severity}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{sign.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 h-5 w-5 text-green-500" />
                Security Best Practices
              </CardTitle>
              <CardDescription className="text-gray-400">
                Essential tips to keep your crypto safe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Phishing Simulation */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Phishing Simulation</CardTitle>
              <CardDescription className="text-gray-400">
                Experience what a phishing attempt looks like
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
                  <p className="text-blue-200 text-sm mb-3">
                    📧 From: support@uniswap-security.com<br />
                    Subject: Urgent: Verify your wallet immediately
                  </p>
                  <p className="text-gray-300 text-sm mb-4">
                    "Your wallet has been flagged for suspicious activity. Click here to verify your wallet and prevent account suspension."
                  </p>
                  <Button 
                    onClick={simulatePhishing}
                    variant="destructive" 
                    size="sm"
                    className="w-full"
                  >
                    Verify Wallet Now (FAKE LINK - DEMO)
                  </Button>
                </div>
                <p className="text-gray-400 text-xs">
                  ⚠️ This is a safe simulation. Clicking will show you what happens in real phishing attempts.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Quiz */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Security Knowledge Quiz
              </CardTitle>
              <CardDescription className="text-gray-400">
                Test your Web3 security knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showQuizResults ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Question {currentQuiz + 1} of {quizQuestions.length}</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <h4 className="text-white font-medium mb-4">
                    {quizQuestions[currentQuiz].question}
                  </h4>
                  
                  <div className="space-y-2">
                    {quizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => handleQuizAnswer(index)}
                      >
                        {String.fromCharCode(65 + index)}. {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">
                    {calculateScore() === quizQuestions.length ? '🎉' : calculateScore() >= 2 ? '👍' : '📚'}
                  </div>
                  <h4 className="text-white text-xl font-bold">
                    Quiz Completed!
                  </h4>
                  <p className="text-gray-300">
                    You scored {calculateScore()} out of {quizQuestions.length}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {calculateScore() === quizQuestions.length 
                      ? "Perfect! You're well-prepared for Web3 security."
                      : calculateScore() >= 2 
                      ? "Good job! Keep learning to improve your security."
                      : "Consider reviewing the security tips above."}
                  </p>
                  <Button onClick={restartQuiz} className="bg-blue-600 hover:bg-blue-700">
                    Take Quiz Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Education;
