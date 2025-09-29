"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChevronDown, HelpCircle, Settings, Play } from 'lucide-react'
// import constants 
import { questionTypes, subjectAreas, nclexCategories, difficultyPresets} from "@/constant/quiz-builder-constants"

interface QuizConfig {
  questionTypes: string[]
  subjectAreas: string[]
  difficulty: string
  numQuestions: number
  quizMode: 'tutor' | 'exam'
  nclexCategories: string[]
  includeMissed: boolean
  shuffleQuestions: boolean
  includeImages: boolean
  includeAudio: boolean
}

interface NCLEXQuizBuilderProps {
  onfinishBuild: (config: QuizConfig) => void
}
export default function NCLEXQuizBuilder({ onfinishBuild}: NCLEXQuizBuilderProps) {
  const [config, setConfig] = useState<QuizConfig>({
    questionTypes: [],
    subjectAreas: [],
    difficulty: 'mixed',
    numQuestions: 25,
    quizMode: 'tutor',
    nclexCategories: [],
    includeMissed: false,
    shuffleQuestions: true,
    includeImages: true,
    includeAudio: false
  })

  const handleQuestionTypeChange = (type: string, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      questionTypes: checked 
        ? [...prev.questionTypes, type]
        : prev.questionTypes.filter(t => t !== type)
    }))
  }

  const handleSubjectAreaChange = (area: string, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      subjectAreas: checked 
        ? [...prev.subjectAreas, area]
        : prev.subjectAreas.filter(a => a !== area)
    }))
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      nclexCategories: checked 
        ? [...prev.nclexCategories, category]
        : prev.nclexCategories.filter(c => c !== category)
    }))
  }

  const selectAllQuestionTypes = () => {
    setConfig(prev => ({
      ...prev,
      questionTypes: questionTypes.map(type => type.id)
    }))
  }

  const selectAllSubjectAreas = () => {
    setConfig(prev => ({
      ...prev,
      subjectAreas: subjectAreas
    }))
  }

  const calculateProgress = () => {
    let progress = 0
    if (config.questionTypes.length > 0) progress += 25
    if (config.subjectAreas.length > 0) progress += 25
    if (config.difficulty) progress += 15
    if (config.numQuestions > 0) progress += 15
    if (config.quizMode) progress += 10
    if (config.nclexCategories.length > 0 || config.includeMissed) progress += 10
    return progress
  }

  const calculateEstimatedTime = () => {
    const baseTimePerQuestion = 1.5 // minutes
    const difficultyMultiplier = config.difficulty === 'hard' ? 1.5 : 
                               config.difficulty === 'moderate' ? 1.2 : 1
    const estimatedMinutes = Math.ceil(config.numQuestions * baseTimePerQuestion * difficultyMultiplier)
    return estimatedMinutes
  }

  // dummy function to simulate starting the quiz during development
  // in real app, this would navigate to the quiz page with the config
  const startQuiz = () => {
    onfinishBuild(config)
    console.log('Starting quiz with configuration:', config)
    //alert(`Quiz starting in ${config.quizMode} mode with ${config.numQuestions} questions!`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">NCLEX Quiz Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Question Types
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select the types of questions you want to practice</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questionTypes.map(type => (
                    <div key={type.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={type.id}
                        checked={config.questionTypes.includes(type.id)}
                        disabled={type.disabled} // disable if marked as disabled = true in constants
                        onCheckedChange={(checked) => handleQuestionTypeChange(type.id, checked as boolean)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor={type.id} className="font-medium">
                          {type.label}
                        </Label>
                        <p className="text-sm text-gray-500">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={selectAllQuestionTypes}
                >
                  Tick all
                </Button>
              </CardContent>
            </Card>

            {/* Subject Areas */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {subjectAreas.map(area => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={config.subjectAreas.includes(area)}
                        onCheckedChange={(checked) => handleSubjectAreaChange(area, checked as boolean)}
                      />
                      <Label htmlFor={area} className="text-sm">{area}</Label>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={selectAllSubjectAreas}
                >
                  Tick all
                </Button>
              </CardContent>
            </Card>

            {/* Difficulty & Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Difficulty Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={config.difficulty}
                    onValueChange={(value) => setConfig(prev => ({ ...prev, difficulty: value }))}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="easy" id="easy" />
                        <Label htmlFor="easy">Easy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderate" id="moderate" />
                        <Label htmlFor="moderate">Moderate</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hard" id="hard" />
                        <Label htmlFor="hard">Hard</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mixed" id="mixed" />
                        <Label htmlFor="mixed">Mixed</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Number of Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Slider
                    value={[config.numQuestions]}
                    onValueChange={(value) => setConfig(prev => ({ ...prev, numQuestions: value[0] }))}
                    min={5}
                    max={100}
                    step={5}
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{config.numQuestions} questions</span>
                    <span>5-100</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {difficultyPresets.map(preset => (
                      <Button
                        key={preset.questions}
                        variant="outline"
                        size="sm"
                        onClick={() => setConfig(prev => ({ ...prev, numQuestions: preset.questions }))}
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quiz Mode Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Quiz Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={config.quizMode}
                  onValueChange={(value) => setConfig(prev => ({ ...prev, quizMode: value as 'tutor' | 'exam' }))}
                >
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="tutor" id="tutor" />
                      <div className="space-y-1">
                        <Label htmlFor="tutor" className="font-medium">Tutor Mode</Label>
                        <p className="text-sm text-gray-500">Shows explanations after each question for immediate learning</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="exam" id="exam" disabled/>
                      <div className="space-y-1">
                        <Label htmlFor="exam" className="font-medium">Exam Mode (coming soon)</Label> {/* htmlFor="exam" */}
                        <p className="text-sm text-gray-500">Shows answers and explanations only at the end of the quiz</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Accordion type="single" collapsible>
              <AccordionItem value="advanced">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Advanced Customization
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>NCLEX Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {nclexCategories.map(category => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={category}
                              checked={config.nclexCategories.includes(category)}
                              onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                            />
                            <Label htmlFor={category} className="text-sm">{category}</Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="missed">Include previously missed questions</Label>
                        <Switch
                          id="missed"
                          checked={config.includeMissed}
                          onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeMissed: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="shuffle">Shuffle questions</Label>
                        <Switch
                          id="shuffle"
                          checked={config.shuffleQuestions}
                          onCheckedChange={(checked) => setConfig(prev => ({ ...prev, shuffleQuestions: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="images">Include images</Label>
                        <Switch
                          id="images"
                          checked={config.includeImages}
                          onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeImages: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="audio">Include audio</Label>
                        <Switch
                          id="audio"
                          checked={config.includeAudio}
                          onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeAudio: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Quiz Preview Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Quiz Preview</CardTitle>
                <CardDescription>Review your quiz configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Configuration Progress</span>
                    <span>{calculateProgress()}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress()}%` }}
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Question Types:</span>
                    <span className="ml-2">
                      {config.questionTypes.length > 0 
                        ? config.questionTypes.join(', ')
                        : 'None selected'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Subject Areas:</span>
                    <span className="ml-2">
                      {config.subjectAreas.length > 0 
                        ? `${config.subjectAreas.length} selected`
                        : 'None selected'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Difficulty:</span>
                    <span className="ml-2 capitalize">{config.difficulty}</span>
                  </div>
                  <div>
                    <span className="font-medium">Questions:</span>
                    <span className="ml-2">{config.numQuestions}</span>
                  </div>
                  <div>
                    <span className="font-medium">Mode:</span>
                    <span className="ml-2 capitalize">{config.quizMode} Mode</span>
                  </div>
                  <div>
                    <span className="font-medium">Est. Time:</span>
                    <span className="ml-2">{calculateEstimatedTime()} min</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={startQuiz}
                  disabled={config.questionTypes.length === 0 || config.subjectAreas.length === 0}
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

